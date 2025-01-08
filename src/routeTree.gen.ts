/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TasksImport } from './routes/tasks'
import { Route as IndexImport } from './routes/index'
import { Route as TradingPostIndexImport } from './routes/tradingPost.index'
import { Route as TasksIndexImport } from './routes/tasks.index'
import { Route as TradingPostItemidImport } from './routes/tradingPost.$itemid'
import { Route as TasksTaskItemImport } from './routes/tasks.$taskItem'

// Create/Update Routes

const TasksRoute = TasksImport.update({
  path: '/tasks',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TradingPostIndexRoute = TradingPostIndexImport.update({
  path: '/tradingPost/',
  getParentRoute: () => rootRoute,
} as any)

const TasksIndexRoute = TasksIndexImport.update({
  path: '/',
  getParentRoute: () => TasksRoute,
} as any)

const TradingPostItemidRoute = TradingPostItemidImport.update({
  path: '/tradingPost/$itemid',
  getParentRoute: () => rootRoute,
} as any)

const TasksTaskItemRoute = TasksTaskItemImport.update({
  path: '/$taskItem',
  getParentRoute: () => TasksRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/tasks': {
      id: '/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof TasksImport
      parentRoute: typeof rootRoute
    }
    '/tasks/$taskItem': {
      id: '/tasks/$taskItem'
      path: '/$taskItem'
      fullPath: '/tasks/$taskItem'
      preLoaderRoute: typeof TasksTaskItemImport
      parentRoute: typeof TasksImport
    }
    '/tradingPost/$itemid': {
      id: '/tradingPost/$itemid'
      path: '/tradingPost/$itemid'
      fullPath: '/tradingPost/$itemid'
      preLoaderRoute: typeof TradingPostItemidImport
      parentRoute: typeof rootRoute
    }
    '/tasks/': {
      id: '/tasks/'
      path: '/'
      fullPath: '/tasks/'
      preLoaderRoute: typeof TasksIndexImport
      parentRoute: typeof TasksImport
    }
    '/tradingPost/': {
      id: '/tradingPost/'
      path: '/tradingPost'
      fullPath: '/tradingPost'
      preLoaderRoute: typeof TradingPostIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface TasksRouteChildren {
  TasksTaskItemRoute: typeof TasksTaskItemRoute
  TasksIndexRoute: typeof TasksIndexRoute
}

const TasksRouteChildren: TasksRouteChildren = {
  TasksTaskItemRoute: TasksTaskItemRoute,
  TasksIndexRoute: TasksIndexRoute,
}

const TasksRouteWithChildren = TasksRoute._addFileChildren(TasksRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/tasks': typeof TasksRouteWithChildren
  '/tasks/$taskItem': typeof TasksTaskItemRoute
  '/tradingPost/$itemid': typeof TradingPostItemidRoute
  '/tasks/': typeof TasksIndexRoute
  '/tradingPost': typeof TradingPostIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/tasks/$taskItem': typeof TasksTaskItemRoute
  '/tradingPost/$itemid': typeof TradingPostItemidRoute
  '/tasks': typeof TasksIndexRoute
  '/tradingPost': typeof TradingPostIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/tasks': typeof TasksRouteWithChildren
  '/tasks/$taskItem': typeof TasksTaskItemRoute
  '/tradingPost/$itemid': typeof TradingPostItemidRoute
  '/tasks/': typeof TasksIndexRoute
  '/tradingPost/': typeof TradingPostIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/tasks'
    | '/tasks/$taskItem'
    | '/tradingPost/$itemid'
    | '/tasks/'
    | '/tradingPost'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/tasks/$taskItem'
    | '/tradingPost/$itemid'
    | '/tasks'
    | '/tradingPost'
  id:
    | '__root__'
    | '/'
    | '/tasks'
    | '/tasks/$taskItem'
    | '/tradingPost/$itemid'
    | '/tasks/'
    | '/tradingPost/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TasksRoute: typeof TasksRouteWithChildren
  TradingPostItemidRoute: typeof TradingPostItemidRoute
  TradingPostIndexRoute: typeof TradingPostIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TasksRoute: TasksRouteWithChildren,
  TradingPostItemidRoute: TradingPostItemidRoute,
  TradingPostIndexRoute: TradingPostIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/tasks",
        "/tradingPost/$itemid",
        "/tradingPost/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/tasks": {
      "filePath": "tasks.tsx",
      "children": [
        "/tasks/$taskItem",
        "/tasks/"
      ]
    },
    "/tasks/$taskItem": {
      "filePath": "tasks.$taskItem.tsx",
      "parent": "/tasks"
    },
    "/tradingPost/$itemid": {
      "filePath": "tradingPost.$itemid.tsx"
    },
    "/tasks/": {
      "filePath": "tasks.index.tsx",
      "parent": "/tasks"
    },
    "/tradingPost/": {
      "filePath": "tradingPost.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
