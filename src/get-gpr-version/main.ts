import * as core from '@actions/core';
import * as github from '@actions/github';

export function isValidPackageType(packageType: string): packageType is PackageType {
    return packageTypes.includes(packageType);
}

export async function run(package_name: string, package_type: PackageType, token: string) {
    const octokit = github.getOctokit(token);

    if (github.context.repo.owner === github.context.actor) {
        // This is a user repository
        try {
            const versions = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
                package_name: package_name.split('/').slice(1).join('/'),
                package_type
            });
            core.setOutput('packageInfo', versions.data.map(v => ({
                id: v.id,
                version: v.name,
                url: v.html_url || v.package_html_url,
                created_at: v.created_at,
                updated_at: v.updated_at,
            })));
        } catch (ex) {
            core.setOutput('packageInfo', []);
        }
    } else {
        // This is an organization repository
        try {
            const versions = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg({
                package_name: package_name.split('/').slice(1).join('/'),
                package_type,
                org: github.context.repo.owner
            });
            core.setOutput('packageInfo', versions.data.map(v => ({
                id: v.id,
                version: v.name,
                url: v.html_url || v.package_html_url,
                created_at: v.created_at,
                updated_at: v.updated_at,
            })));
        } catch (ex) {
            core.setOutput('packageInfo', []);
        }
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