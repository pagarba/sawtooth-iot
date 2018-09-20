param(
	[Int32]$buildNumber=0,
	[String]$branchName="Sprint",
	[String]$sprintNumber="3.4",
	[String]$gitCommitHash="unknownHash",
	[String]$applicationName="ClinicianWeb",
	[Switch]$isMainBranch=$False)

$publishFolder = "$PSScriptRoot\.build\temp"
$packPath = "C:\Octopus\Packages"
$sourceFolder = "$PSScriptRoot\dist\dev"

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
	$packPath = "C:\Octopus\Packages\MASTER"
}
$buildVersion = "$sprintNumber.$buildNumber"

function Clean-BuildItems
{
	Write-Host "Removing publishFolder at $publishFolder"
    Set-Location $sourceFolder
    if (Test-Path $publishFolder)
    {
        Remove-Item $publishFolder -force -Recurse  
    }

	Write-Host "Removing temporary packages at $packPath"
	Get-ChildItem -Path $packPath | Where { $_.Name -like "$applicationName.*.nupkg" -and $_.Name -notlike "$applicationName.$buildVersion.nupkg" } | Remove-Item -force -Recurse
}


& Clean-BuildItems