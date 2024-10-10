import * as core from '@actions/core';
import axios from 'axios';


export async function run(package_name: string) {
    console.log(`Fetching package version for ${package_name} from NPM`);
    // Documentation: https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#version
    const response = await axios.get<PackageInfo>(`https://registry.npmjs.com/${package_name}`);
    const d = response.data;
    const result = {
        description: d.description,
        homepage: d.homepage,
        name: d.name,
        maintainers: d.maintainers.map(m => ({
            name: m.name,
            email: m.email,
        })),
        // readme: d.readme,
        readmeFilename: d.readmeFilename,
        repository: {
            type: d.repository.type,
            url: d.repository.url,
            directory: d.repository.directory,
        },
        time: d.time,
        versions: Object.keys(d.versions).map(key => ({
            version: key,
            typings: d.versions[key].typings,
        })),
    };

    core.setOutput('packageInfo', result);
}

export interface PackageInfo {
    name: string;
    versions: Record<string, VersionInfo>;
    time: Record<string, Date>;
    homepage: string;
    repository: RepositoryInfo;
    description: string;
    maintainers: RepositoryMaintainer[];
    readme: string;
    readmeFilename: string;
}

export interface VersionInfo {
    typings: string;
    // peerDependencies ?
}

export interface RepositoryInfo {
    type: string;
    url: string;
    directory: string;
}

export interface RepositoryMaintainer {
    name: string;
    email: string;
}