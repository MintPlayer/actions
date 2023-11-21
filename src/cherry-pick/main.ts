import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';

export async function run(ms: number) {
    console.log(`Waiting for ${ms} ms`);

    await new Promise((resolve) => {
        setTimeout(() => resolve(true), ms);
    });

    await exec.exec('git', ['branch', '-a', '-r', '| grep -v "HEAD"'], {
        listeners: {
            stdout: (data) => {
                console.log(`Found branch: ${data}`);
            },
            stderr: (data) => {
                console.error('Got error', data);
            }
        }
    });

    console.log(`Done`);
}