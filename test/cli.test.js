'use strict';

const assert = require('assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CLI = path.join(__dirname, '..', 'bin', 'agent-skills.js');
const SKILLS_DIR = path.join(__dirname, '..', 'skills');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    process.stdout.write('ok   - ' + name + '\n');
  } catch (err) {
    process.stderr.write('FAIL - ' + name + '\n      ' + err.message + '\n');
    process.exitCode = 1;
  }
}

function run(args, opts) {
  return execFileSync('node', [CLI].concat(args), Object.assign({ encoding: 'utf8' }, opts));
}

function runExpectFail(args) {
  try {
    execFileSync('node', [CLI].concat(args), { encoding: 'utf8', stdio: 'pipe' });
    return null;
  } catch (err) {
    return err;
  }
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'agent-skills-test-'));
}

const EXPECTED = [
  'compact-final',
  'handoff-writer',
  'orwell-writing',
  'quiet-benchmark',
  'review-first',
  'scope-lock',
  'smalltalksucks'
];

test('help prints usage', function () {
  const out = run(['help']);
  assert.ok(out.indexOf('agent-skills') !== -1);
  assert.ok(out.indexOf('--target') !== -1);
  assert.ok(out.indexOf('--force') !== -1);
  assert.ok(out.indexOf('--dry-run') !== -1);
});

test('no args prints help', function () {
  const out = run([]);
  assert.ok(out.indexOf('Usage:') !== -1);
});

test('list shows all bundled skills', function () {
  const out = run(['list']);
  EXPECTED.forEach(function (name) {
    assert.ok(out.indexOf(name) !== -1, 'missing ' + name + ' in list');
  });
});

test('every bundled skill has valid frontmatter', function () {
  EXPECTED.forEach(function (name) {
    const file = path.join(SKILLS_DIR, name, 'SKILL.md');
    const content = fs.readFileSync(file, 'utf8');
    assert.ok(/^---\n/.test(content), name + ' missing frontmatter start');
    assert.ok(/^name:\s*\S+/m.test(content), name + ' missing name');
    assert.ok(/^description:\s*\S+/m.test(content), name + ' missing description');
  });
});

test('install dry-run writes nothing', function () {
  const dir = tmpDir();
  const out = run(['install', 'smalltalksucks', '--target', dir, '--dry-run']);
  assert.ok(out.indexOf('Dry run') !== -1);
  assert.ok(!fs.existsSync(path.join(dir, 'smalltalksucks')), 'dry-run should not write');
});

test('install copies skill to target', function () {
  const dir = tmpDir();
  run(['install', 'smalltalksucks', '--target', dir]);
  assert.ok(fs.existsSync(path.join(dir, 'smalltalksucks', 'SKILL.md')));
});

test('install all copies every skill', function () {
  const dir = tmpDir();
  run(['install', 'all', '--target', dir]);
  EXPECTED.forEach(function (name) {
    assert.ok(fs.existsSync(path.join(dir, name, 'SKILL.md')), 'missing installed ' + name);
  });
});

test('install does not overwrite without --force', function () {
  const dir = tmpDir();
  run(['install', 'smalltalksucks', '--target', dir]);
  const skillFile = path.join(dir, 'smalltalksucks', 'SKILL.md');
  fs.writeFileSync(skillFile, 'CUSTOM');
  const out = run(['install', 'smalltalksucks', '--target', dir]);
  assert.ok(out.indexOf('skipped') !== -1);
  assert.strictEqual(fs.readFileSync(skillFile, 'utf8'), 'CUSTOM');
});

test('install overwrites with --force', function () {
  const dir = tmpDir();
  run(['install', 'smalltalksucks', '--target', dir]);
  const skillFile = path.join(dir, 'smalltalksucks', 'SKILL.md');
  fs.writeFileSync(skillFile, 'CUSTOM');
  run(['install', 'smalltalksucks', '--target', dir, '--force']);
  assert.notStrictEqual(fs.readFileSync(skillFile, 'utf8'), 'CUSTOM');
});

test('unknown skill exits non-zero', function () {
  const dir = tmpDir();
  const err = runExpectFail(['install', 'does-not-exist', '--target', dir]);
  assert.ok(err, 'expected non-zero exit for unknown skill');
  assert.ok((err.stderr || '').indexOf('unknown') !== -1);
});

test('unknown option exits non-zero', function () {
  const err = runExpectFail(['list', '--bogus']);
  assert.ok(err, 'expected non-zero exit for unknown option');
});

process.on('exit', function () {
  process.stdout.write('\n' + passed + ' passing\n');
});
