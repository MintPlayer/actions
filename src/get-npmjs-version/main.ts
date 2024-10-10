import * as core from '@actions/core';
import axios from 'axios';


export async function run(package_name: string) {
    console.log(`Fetching package version for ${package_name} from NPM`);
    const response = await axios.get<PackageInfo>(`https://registry.npmjs.com/${package_name}`);
    core.setOutput('packageInfo', response.data);
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