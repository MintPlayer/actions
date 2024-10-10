import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

export function isValidPackageType(packageType: string): packageType is PackageType {
    return packageTypes.includes(packageType);
}

export async function run(package_name: string, package_type: PackageType) {
    const octokit = new Octokit({ auth: { }});

    const versions = await octokit.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
        package_name,
        package_type
    });

    core.setOutput('packageInfo', versions);
}

export const packageTypes: string[] = [
    'npm',
    'maven',
    'rubygems',
    'docker',
    'nuget',
    'container'
];

export type PackageType = 
    | 'npm'
    | 'maven'
    | 'rubygems'
    | 'docker'
    | 'nuget'
    | 'container';