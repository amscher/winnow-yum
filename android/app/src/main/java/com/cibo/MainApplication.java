package com.cibo;

import android.app.Application;
import android.content.Intent;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  // Added for firebase / fblogin
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  // Added for react-native-navigation
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Added for react-native-navigation
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
       new RNFirebasePackage(),
       new RNFirebaseAnalyticsPackage(),
       new RNFirebaseDatabasePackage(),
       new RNFirebaseAuthPackage(),
       new FBSDKPackage(mCallbackManager),
       new RNFirebaseStoragePackage(),
       new RCTCameraPackage()
    );
  }

  // Added for react-native-navigation
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // To get FBSDK to work
    setActivityCallbacks(new ActivityCallbacks() {
      @Override
      public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
      }
    });
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }


  // ---------- removed below and replaced by react-native-navigation initialization
  //
  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   public boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }


  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //        new MainReactPackage(),
  //        new RNFirebasePackage(),
  //        new RNFirebaseAnalyticsPackage(),
  //        new RNFirebaseDatabasePackage(),
  //        new RNFirebaseAuthPackage(),
  //        new RNFirebaseStoragePackage(),
  //        new FBSDKPackage(mCallbackManager),
  //        new RCTCameraPackage()
  //     );
  //   }

  //   @Override
  //   protected String getJSMainModuleName() {
  //     return "index";
  //   }

  // };

  // @Override
  // public ReactNativeHost getReactNativeHost() {
  //   return mReactNativeHost;
  // }
  // ----------------------------------------------


}
