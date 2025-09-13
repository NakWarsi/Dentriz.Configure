# PowerShell script to create and push API deployment tags
param(
    [Parameter(Mandatory=$true)]
    [string]$Version,
    
    [Parameter(Mandatory=$false)]
    [string]$Message = "Deploy API version $Version"
)

$tagName = "api-v$Version"

Write-Host "🚀 Creating deployment tag: $tagName" -ForegroundColor Green

# Check if tag already exists
$existingTag = git tag -l $tagName
if ($existingTag) {
    Write-Host "❌ Tag $tagName already exists!" -ForegroundColor Red
    Write-Host "Use a different version number or delete the existing tag first." -ForegroundColor Yellow
    exit 1
}

# Create and push tag
try {
    Write-Host "📝 Creating tag: $tagName" -ForegroundColor Yellow
    git tag -a $tagName -m $Message
    
    Write-Host "📤 Pushing tag to remote..." -ForegroundColor Yellow
    git push origin $tagName
    
    Write-Host "✅ Tag $tagName created and pushed successfully!" -ForegroundColor Green
    Write-Host "🔄 GitHub Actions will now deploy your API to Azure..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📊 Monitor the deployment at:" -ForegroundColor White
    Write-Host "   https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')/actions" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Error creating/pushing tag: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
