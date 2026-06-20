#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const DEFAULT_TARGET = path.join(os.homedir(), '.agents', 'skills');

function fail(message, code) {
  process.stderr.write('Error: ' + message + '\n');
  process.exit(typeof code === 'number' ? code : 1);
}

function parseArgs(argv) {
  const positional = [];
  const flags = { force: false, dryRun: false, target: null };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--force') {
      flags.force = true;
    } else if (arg === '--dry-run') {
      flags.dryRun = true;
    } else if (arg === '--target') {
      flags.target = argv[++i];
      if (!flags.target) fail('--target requires a path');
    } else if (arg.startsWith('--target=')) {
      flags.target = arg.slice('--target='.length);
      if (!flags.target) fail('--target requires a path');
    } else if (arg === '-h' || arg === '--help') {
      positional.unshift('help');
    } else if (arg.startsWith('-')) {
      fail('unknown option: ' + arg);
    } else {
      positional.push(arg);
    }
  }

  return { positional, flags };
}

function listSkillNames() {
  let entries;
  try {
    entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  } catch (err) {
    fail('could not read bundled skills directory (' + err.message + ')');
  }
  return entries
    .filter(function (e) { return e.isDirectory(); })
    .map(function (e) { return e.name; })
    .filter(function (name) {
      return fs.existsSync(path.join(SKILLS_DIR, name, 'SKILL.md'));
    })
    .sort();
}

function readDescription(skillName) {
  const skillFile = path.join(SKILLS_DIR, skillName, 'SKILL.md');
  let content;
  try {
    content = fs.readFileSync(skillFile, 'utf8');
  } catch (err) {
    return '(no description)';
  }
  const match = content.match(/^description:\s*(.+)$/m);
  if (match) {
    return match[1].trim().replace(/^["']|["']$/g, '');
  }
  return '(no description)';
}

function copyDir(src, dest, dryRun, plannedFiles) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  if (!dryRun) fs.mkdirSync(dest, { recursive: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, dryRun, plannedFiles);
    } else if (entry.isFile()) {
      plannedFiles.push(destPath);
      if (!dryRun) fs.copyFileSync(srcPath, destPath);
    }
  }
}

function installSkill(skillName, targetRoot, flags, available) {
  if (available.indexOf(skillName) === -1) {
    return { name: skillName, status: 'unknown' };
  }

  const src = path.join(SKILLS_DIR, skillName);
  const dest = path.join(targetRoot, skillName);

  if (fs.existsSync(dest) && !flags.force) {
    return { name: skillName, status: 'exists', dest: dest };
  }

  const plannedFiles = [];
  try {
    copyDir(src, dest, flags.dryRun, plannedFiles);
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      return { name: skillName, status: 'permission', dest: dest, message: err.message };
    }
    if (err.code === 'ENOENT') {
      return { name: skillName, status: 'missing', dest: dest, message: err.message };
    }
    return { name: skillName, status: 'error', dest: dest, message: err.message };
  }

  return {
    name: skillName,
    status: flags.dryRun ? 'would-install' : 'installed',
    dest: dest,
    files: plannedFiles
  };
}

function cmdList() {
  const names = listSkillNames();
  if (names.length === 0) {
    process.stdout.write('No skills bundled.\n');
    return 0;
  }
  const width = names.reduce(function (m, n) { return Math.max(m, n.length); }, 0);
  process.stdout.write('Available skills:\n\n');
  for (const name of names) {
    const pad = ' '.repeat(width - name.length);
    process.stdout.write('  ' + name + pad + '  ' + readDescription(name) + '\n');
  }
  process.stdout.write('\nInstall with: agent-skills install <skill>\n');
  return 0;
}

function cmdInstall(positional, flags) {
  const requested = positional.slice(1);
  if (requested.length === 0) {
    fail('install requires a skill name (or "all"). Try: agent-skills list');
  }

  const available = listSkillNames();
  const targetRoot = flags.target
    ? path.resolve(flags.target)
    : DEFAULT_TARGET;

  let toInstall;
  if (requested.length === 1 && requested[0] === 'all') {
    toInstall = available.slice();
  } else {
    toInstall = requested;
  }

  process.stdout.write(
    (flags.dryRun ? 'Dry run. ' : '') +
    'Target: ' + targetRoot + '\n\n'
  );

  const results = toInstall.map(function (name) {
    return installSkill(name, targetRoot, flags, available);
  });

  let hadError = false;
  for (const r of results) {
    switch (r.status) {
      case 'installed':
        process.stdout.write('  installed   ' + r.name + ' -> ' + r.dest + '\n');
        break;
      case 'would-install':
        process.stdout.write('  would copy  ' + r.name + ' (' + r.files.length + ' file(s)) -> ' + r.dest + '\n');
        break;
      case 'exists':
        process.stdout.write('  skipped     ' + r.name + ' (already exists; use --force to overwrite)\n');
        break;
      case 'unknown':
        process.stderr.write('  unknown     ' + r.name + ' (not a bundled skill; run "agent-skills list")\n');
        hadError = true;
        break;
      case 'permission':
        process.stderr.write('  denied      ' + r.name + ' (permission denied: ' + r.dest + ')\n');
        hadError = true;
        break;
      case 'missing':
        process.stderr.write('  missing     ' + r.name + ' (source files missing: ' + r.message + ')\n');
        hadError = true;
        break;
      default:
        process.stderr.write('  error       ' + r.name + ' (' + r.message + ')\n');
        hadError = true;
    }
  }

  return hadError ? 1 : 0;
}

function cmdHelp() {
  process.stdout.write([
    'agent-skills - install reusable AI agent skills',
    '',
    'Usage:',
    '  agent-skills list',
    '  agent-skills install <skill> [options]',
    '  agent-skills install all [options]',
    '  agent-skills help',
    '',
    'Options:',
    '  --target <path>   Install into <path> (default: ' + DEFAULT_TARGET + ')',
    '  --force           Overwrite an existing installed skill',
    '  --dry-run         Show what would be installed without writing',
    '',
    'Examples:',
    '  npx @robertdevore/agent-skills list',
    '  npx @robertdevore/agent-skills install smalltalksucks',
    '  npx @robertdevore/agent-skills install compact-final',
    '  npx @robertdevore/agent-skills install all',
    '  npx @robertdevore/agent-skills install scope-lock --target ./.agents/skills',
    '  npx @robertdevore/agent-skills install all --dry-run',
    '  npx @robertdevore/agent-skills install review-first --force',
    ''
  ].join('\n'));
  return 0;
}

function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const command = positional[0];

  let exitCode;
  switch (command) {
    case undefined:
    case 'help':
      exitCode = cmdHelp();
      break;
    case 'list':
      exitCode = cmdList();
      break;
    case 'install':
      exitCode = cmdInstall(positional, flags);
      break;
    default:
      process.stderr.write('Unknown command: ' + command + '\n\n');
      cmdHelp();
      exitCode = 1;
  }
  process.exit(exitCode);
}

main();
