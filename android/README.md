# Android WebView Wrapper

This folder contains a native Android wrapper for the existing offline web app.

## What it does

- Packages the web app into an Android APK
- Loads the app from local bundled assets through `WebViewAssetLoader`
- Prepares the activity for kiosk use with `lockTaskMode="if_whitelisted"`

## First setup

1. Open this `android/` folder in Android Studio.
2. Run `sync-web-assets.ps1` from the `android/` folder to copy the web app into `app/src/main/assets/www/`.
3. Let Android Studio download the Gradle SDK dependencies.

## Build

1. Choose an emulator or attached Android tablet.
2. Run the `app` configuration from Android Studio.
3. For an installable artifact, use:
   - `Build > Build Bundle(s) / APK(s) > Build APK(s)`

## Asset updates

Whenever the web app changes, rerun:

```powershell
.\sync-web-assets.ps1
```

Then rebuild the Android app.
