import * as core from '@actions/core';
import { isValidPackageType, packageTypes, run } from './main';

const package_name: string = core.getInput('package_name');
const package_type: string = core.getInput('package_type');

if (!isValidPackageType(package_type)) {
    const message = `package_type should be one of [${packageTypes.join(', ')}]`;
    core.error(message);
    throw message;
}

run(package_name, package_type);