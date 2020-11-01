# Taiga.io client

## Create client
You should import _TaigaClientFactory_ and use _.createBaseClient_ or _.createAuthClient_

### Base client
You can use GET functions without authentication

### Auth client
You can use POST functions only with authentication

## Examples

1. Create Base Client and get information about all projects and filter by is_backlog_activated: true
and order by total_fans

test.ts:
```typescript
import { TaigaClientFactory } from './index';
import { ProjectsOrderBy } from './index';

(async() => {
    const client = await TaigaClientFactory.createBaseClient();


    console.log((await client.getAllProjects({
        is_backlog_activated: true
    }, ProjectsOrderBy.TOTAL_FANS)));

})().catch((err: unknown) => {
    console.log(err);
});
```

2. Create Auth Client and create a new project, authentication with dotenv

local.env:
```text
TAIGA_URL=url
TAIGA_LOGIN=login
TAIGA_PASSWORD=password
```

test.ts:
```typescript
import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../local.env') });

import { TaigaClientFactory } from './index';


(async() => {
    const client = await TaigaClientFactory.createAuthClient();

    console.log((await client.createProject({
        creation_template: 1,
        description: 'The best project in the MIEM',
        is_backlog_activated: true,
        is_issues_activated: true,
        is_kanban_activated: true,
        is_private: true,
        is_wiki_activated: true,
        name: 'Super Project',
        total_milestones: 0,
        total_story_points: 0
    })));
})().catch((err: unknown) => {
    console.log(err);
});


```


