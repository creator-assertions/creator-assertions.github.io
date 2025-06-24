/**
 * Adds a cleanup comment to a pull request
 * @param {Object} github - GitHub API client
 * @param {Object} context - GitHub Actions context
 */
module.exports = async ({ github, context }) => {
  const prNumber = context.issue.number;
  
  try {
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
    return { success: true };
  } catch (error) {
    console.log(`Failed to add cleanup comment to PR #${prNumber}: ${error.message}`);
    return { success: false, error: error.message };
  }
}; 
