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

### `delete-environment.js`
**Used by:** `deploy-preview.yml` (cleanup-on-close job)  
**Purpose:** Deletes GitHub deployment environments

**Parameters:**
- `github` - GitHub API client from `actions/github-script`
- `context` - GitHub Actions context

**Returns:**
- `{ success: boolean, environmentName: string, error?: string }`

### `cleanup-comment.js`
**Used by:** Standalone utility  
**Purpose:** Adds cleanup confirmation comments to PRs

**Parameters:**
- `github` - GitHub API client from `actions/github-script`
- `context` - GitHub Actions context

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

## Usage in Workflows

To use these scripts in GitHub Actions workflows:

```yaml
- name: Run script
  uses: actions/github-script@v7
  with:
    script: |
      const scriptName = require('./.github/scripts/script-name.js');
      await scriptName({ github, context, additionalParams });
```

## Error Handling

All scripts include comprehensive error handling and logging:
- Detailed console output for debugging
- Graceful degradation when API calls fail
- Fallback behaviors for common error scenarios

## Development

When modifying these scripts:
1. Test changes in a development branch with a pull request
2. Check the Actions logs for proper execution
3. Verify error handling with invalid scenarios
4. Update this documentation if adding new scripts or parameters 