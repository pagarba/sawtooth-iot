param(
	[Int32]$buildNumber=0,
	[String]$branchName="Sprint",
	[String]$sprintNumber="3.4",
	[String]$gitCommitHash="unknownHash",
	[String]$applicationName="ClinicianWeb",
	[Switch]$isMainBranch=$False)

$publishFolder = "$PSScriptRoot\.build\temp\$($applicationName)"
$sourceFolder = "$PSScriptRoot\dist\"

$buildVersion = "$buildNumber"
if ($branchName -like 'Sprint') 
{
	$sprintNumber="3.4"
}
if ($branchName -like 'HOT') 
{
	$sprintNumber="0.1"
	$packPath = "C:\Octopus\Packages\HOT"
}
if ($branchName -like 'master') 
{
	$sprintNumber = "1.1"
}
$buildVersion = "$sprintNumber.$buildNumber"

function Deploy-Project
{
    npm cache verify
	npm install
	npm run build.dev
	npm run build.prod
	Copy ".\ClinicianWeb.nuspec" ".\dist\"
	Copy ".\Web.config" ".\dist\prod\"
	Copy ".\Web.config" ".\dist\tmp\"
	
    Set-Location $sourceFolder

    & Copy-Project
    $nuspecPath = "$publishFolder/$($applicationName).$buildVersion.nuspec"
    "Nuspec address: $nuspecPath"
    Copy-Item "$($applicationName).nuspec" $nuspecPath
	
    # Load the nuspec file as XML
    $nuspec = [xml](Get-Content -Path $nuspecPath)
    $metadata = $nuspec.package.metadata

    # Edit the metadata
    $metadata.version = $metadata.version.Replace("[buildVersion]", $buildVersion)
    $metadata.id = $metadata.id.Replace("[appName]", $applicationName)
    $metadata.title = $metadata.title.Replace("[appName]", $applicationName)
    $metadata.description = $metadata.description.Replace("[appName]", $applicationName)
    $metadata.copyright = $metadata.copyright.Replace("[year]", [System.DateTime]::Now.Year)
                
    $metadata.releaseNotes = "Build Number: $buildVersion`r`nBranch Name: $branchName`r`nCommit Hash: $gitCommitHash"

    # Save the nuspec file
    $nuspec.Save((Get-Item $nuspecPath))
}

function Copy-Project()
{
	if (!(Test-Path $publishFolder)) { 
		New-Item $publishFolder -Type Directory | Out-Null		
	}
	Get-ChildItem $sourceFolder | ` 
        Where { $_.Name -notlike '*configUrls*' `
        -and  $_.Name -notlike '*.build' `
        -and  $_.Name -notlike 'jspm_packages' `
        -and  $_.Name -notlike 'install' `
        -and  $_.Name -notlike '*.gitignore' `
        -and  $_.Name -notlike '*.ps1' `
        -and  $_.Name -notlike '*.nuspec' `
        -and  $_.Name -notlike '*.vscode' } | Copy-ProjItem -projectAppAddress $publishFolder
}


function Copy-ProjItem($projectAppAddress)
{	     
    process {
        Copy-Item $_.FullName $projectAppAddress -Recurse -Force
    }
}

& Deploy-Project
