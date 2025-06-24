/**
 * Deletes a GitHub deployment environment
 * @param {Object} github - GitHub API client
 * @param {Object} context - GitHub Actions context
 */
module.exports = async ({ github, context }) => {
  const prNumber = context.issue.number;
  const environmentName = `preview-pr-${prNumber}`;
  
  try {
    // Get the environment to verify it exists
    const environment = await github.rest.repos.getEnvironment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      environment_name: environmentName
    });
    
    // Delete the environment
    await github.rest.repos.deleteAnEnvironment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      environment_name: environmentName
    });
    
    console.log(`Environment ${environmentName} deleted successfully`);
    return { success: true, environmentName };
  } catch (error) {
    console.log(`Environment ${environmentName} not found or already deleted: ${error.message}`);
    return { success: false, environmentName, error: error.message };
  }
}; 
