# Software Heritage Stories

## About the Project

Dynamic Stories App developed by the [Science Stories Team](http://sciencestories.io) in collaboration with [Software Heritage](https://www.softwareheritage.org/swhap/)  
to display software curated by the Software Heritage Acquisition Process in a multi-media web-based visualizer.

## Content Source Configuration

The app supports two data source modes controlled by environment variables:

1. `BUCKET` mode: fetches static JSON content from a bucket/CDN path.
2. `API` mode: fetches content from Stories Services API.

Set these values in your environment (usually `.env`).

### Bucket Mode

```bash
VITE_STORIES_CONTENT_SOURCE=BUCKET
VITE_COLLECTIONS_BASE_URL=https://your-cdn-or-bucket-domain
VITE_COLLECTIONS_ROOT_PATH=/collections
```

Expected paths:

1. `/collections/manifest.json`
2. `/collections/:collectionId/manifest.json`
3. `/collections/:collectionId/stories/:storyId.json`

### Stories API Mode

```bash
VITE_STORIES_CONTENT_SOURCE=API
VITE_STORIES_SERVICES_API_BASE_URL=your_services_api_env_base_url
VITE_STORIES_SERVICES_API_KEY=your_api_key
VITE_STORIES_SERVICES_PROJECT_ID=your_project_id
```

Notes:

1. `VITE_STORIES_CONTENT_SOURCE` defaults to `BUCKET`.
2. API mode requires all three API vars (`BASE_URL`, `API_KEY`, `PROJECT_ID`).
3. UI rendering remains the same in either mode; source branching is handled in the data layer.
