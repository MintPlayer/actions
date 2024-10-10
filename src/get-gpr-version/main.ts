import * as core from '@actions/core';
import * as github from '@actions/github';

export function isValidPackageType(packageType: string): packageType is PackageType {
    return packageTypes.includes(packageType);
}

export async function run(package_name: string, package_type: PackageType, token: string) {
    const octokit = github.getOctokit(token);

    // const x = await octokit.users.getAuthenticated();

    if (github.context.repo.owner === github.context.actor) {
        // This is a user repository
        const versions = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
            package_name,
            package_type
        });
        core.setOutput('packageInfo', versions);
    } else {
        // This is an organization repository
        const versions = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg({
            package_name,
            package_type,
            org: github.context.repo.owner
        });
        core.setOutput('packageInfo', versions);
    }

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