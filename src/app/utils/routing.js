import URI from 'urijs'

const base = () => {
  return new URI({
    protocol: 'http',
    hostname: 'ec2-54-157-243-34.compute-1.amazonaws.com',
    port: 5000
  })
}

export default base

const buildURL = (path, query=null) => {
  return base().path(path).query(query).toString()
}

export const explorerGetDirURL = (projectName) => {
  return buildURL('/explorer/getdir', {project: projectName})
}

export const explorerGetFileURL = (projectName, filePath) => {
  return buildURL('/explorer/project', {project: projectName, path: filePath})
}

export const buildProjectURL = (projectName) => {
  return buildURL('/tools/build', {project: projectName})
}

export const saveProjectURL = (projectName, filePath) => {
  return buildURL('/tools/save', {project: projectName, path: filePath})
}

export const subscribeServerURL = (projectName) => {
  return buildURL('/subscribeServer', {project: projectName})
}

export const getBuildLogURL = (buildId, startTime) => {
  return buildURL('/tools/buildlog', {buildId: buildId, startTime: startTime})
}

export const getAppLogURL = (appName, ts) => {
  return buildURL('/tools/applog', {appName: appName, startTime: ts})
}

export const createProjectURL = (projectName, packageName, description='') => {
  return buildURL('/tools/createProject', {name: projectName, package: packageName, description: description})
}

export const createFolderURL = (appName, currPath) => {
  return buildURL('/explorer/createFolder', {appName: appName, currPath: currPath})
}

export const createFileURL = (appName, currPath) => {
  return buildURL('/explorer/createFile', {appName: appName, currPath: currPath})
}

export const deleteFolderURL = (appName, currPath) => {
  return buildURL('/explorer/deleteFolder', {appName: appName, currPath: currPath})
}

export const deleteFileURL = (appName, currPath) => {
  return buildURL('/explorer/deleteFile', {appName: appName, currPath: currPath})
}
