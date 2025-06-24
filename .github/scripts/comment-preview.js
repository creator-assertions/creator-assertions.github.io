/**
 * Comments on a pull request with the deploy preview URL
 * @param {Object} github - GitHub API client
 * @param {Object} context - GitHub Actions context
 * @param {string} deploymentUrl - The URL of the deployed preview
 */
module.exports = async ({ github, context, deploymentUrl }) => {
  const prNumber = context.issue.number;
  
  // Find existing preview comment
  const comments = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
  });
  
  const existingComment = comments.data.find(comment => 
    comment.body.includes('🚀 Deploy Preview')
  );
  
  const commentBody = `🚀 **Deploy Preview** for PR #${prNumber} is ready!
  
**Preview URL:** ${deploymentUrl}

This preview will be updated automatically when you push new changes to this PR.

---
*Deployed from commit: ${context.sha}*`;
  
  if (existingComment) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: existingComment.id,
      body: commentBody
    });
    console.log(`Updated existing preview comment for PR #${prNumber}`);
  } else {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body: commentBody
    });
    console.log(`Created new preview comment for PR #${prNumber}`);
  }
}; 
