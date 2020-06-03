Set wshShell = CreateObject( "WScript.Shell" )
userFolderPath = wshShell.ExpandEnvironmentStrings( "%UserProfile%" )

testPath = userFolderPath & "\Documents\Unified Functional Testing\" & WScript.Arguments(0)
  Dim objFSO
  Set objFSO = CreateObject("Scripting.FileSystemObject")
  DoesFolderExist = objFSO.FolderExists(testPath)
  Set objFSO = Nothing
  If DoesFolderExist Then

  Set qtResultsOpt = CreateObject("QuickTest.RunResultsOptions") ' Create the Run Results Options object
  qtResultsOpt.ResultsLocation = "C:\UFTRunResult"

  Dim qtApp
  Dim qtTest
  Set qtApp = CreateObject("QuickTest.Application")
  qtApp.Launch
  qtApp.Visible = True
  qtApp.Open testPath, False
  Set qtTest = qtApp.Test
  qtTest.Run qtResultsOpt
  qtTest.Close
  qtApp.Quit
  Else
  End If