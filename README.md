# Taiga.io client
<a href="https://gitmoji.carloscuesta.me">
    <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat"
         alt="Gitmoji">
</a>

## Create client
You should import _TaigaClient_

## Example

- Create Client and get information about all projects and filter by is_backlog_activated: true and order by total_fans

```typescript
import { TaigaClient } from 'taigaio-client';

(async () => {
    const client = new TaigaClient('localhost:8080', '<usertoken>');

    const filteredProjects = await client.getProjectList({
        is_backlog_activated: true,
        order_by: 'total_fans'
    });

})().catch((err: unknown) => {
    console.log(err);
});
```

- or the same thing, but with normal login

```typescript
import { TaigaClient } from 'taigaio-client';

(async () => {
    const client = new TaigaClient('localhost:8080');

    await client.normalLogin('<username>', '<password>');

    const filteredProjects = await client.getProjectList({
        is_backlog_activated: true,
        order_by: 'total_fans'
    });

})().catch((err: unknown) => {
    console.log(err);
});
```
