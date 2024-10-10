import * as core from '@actions/core';
import { run } from './main';

const package_name: string = core.getInput('package_name');
run(package_name);