# GitHub Workflow Scripts

This directory contains JavaScript modules used by GitHub Actions workflows to interact with the GitHub API.

## Scripts

### `comment-preview.js`
**Used by:** `deploy-preview.yml`  
**Purpose:** Comments on pull requests with deploy preview URLs

**Parameters:**
- `github` - GitHub API client from `actions/github-script`
- `context` - GitHub Actions context
- `deploymentUrl` - The URL of the deployed preview site

**Behavior:**
- Finds existing preview comments and updates them
- Creates new comments if none exist
- Includes commit SHA and PR number in the comment

### `cleanup-preview.js`
**Used by:** `cleanup-preview.yml`  
**Purpose:** Complete cleanup workflow - deletes environment and adds comment

**Parameters:**
- `github` - GitHub API client from `actions/github-script`
- `context` - GitHub Actions context

**Behavior:**
- Deletes the deployment environment
- Adds cleanup confirmation comment
- Handles errors gracefully with fallback comments
