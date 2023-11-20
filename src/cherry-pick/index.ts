import * as core from '@actions/core';
import { run } from './main';

const ms_string: string = core.getInput('milliseconds');
const ms = parseInt(ms_string);
run(ms);