/**
 * Performs complete cleanup for a pull request preview
 * - Deletes the deployment environment
 * - Adds a cleanup comment to the PR
 * @param {Object} github - GitHub API client
 * @param {Object} context - GitHub Actions context
 */
module.exports = async ({ github, context }) => {
  const prNumber = context.issue.number;
  const environmentName = `preview-pr-${prNumber}`;
  
  try {
    // Delete the environment
    await github.rest.repos.deleteAnEnvironment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      environment_name: environmentName
    });
    
    console.log(`Environment ${environmentName} deleted successfully`);
    
    // Add cleanup comment to PR
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body: `🧹 **Deploy Preview Cleaned Up**
      
The preview environment for this PR has been automatically deleted.

---
*Cleanup completed for PR #${prNumber}*`
    });
    
    console.log(`Cleanup comment added to PR #${prNumber}`);
    
  } catch (error) {
    console.log(`Cleanup failed for PR #${prNumber}: ${error.message}`);
    
    // Still try to add a comment even if environment deletion failed
    try {
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        body: `⚠️ **Deploy Preview Cleanup**
        
Attempted to clean up preview environment for PR #${prNumber}.
Environment may have already been deleted or was not found.

---
*Cleanup process completed*`
      });
      console.log(`Fallback cleanup comment added to PR #${prNumber}`);
    } catch (commentError) {
      console.log(`Failed to add cleanup comment: ${commentError.message}`);
    }
  }
}; 
