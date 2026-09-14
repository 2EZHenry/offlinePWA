import java.util.Properties
import com.android.build.gradle.internal.api.BaseVariantOutputImpl

plugins {
	id("com.android.application")
	id("org.jetbrains.kotlin.android")
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("keystore.properties")

if (keystorePropertiesFile.exists()) {
	keystorePropertiesFile.inputStream().use(keystoreProperties::load)
}

android {
	namespace = "com.energizer.batteryguide"
	compileSdk = 34

	defaultConfig {
		applicationId = "com.energizer.batteryguide"
		minSdk = 26
		targetSdk = 34
		versionCode = 1
		versionName = "1.0.0"

		testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
	}

	signingConfigs {
		if (keystorePropertiesFile.exists()) {
			create("release") {
				storeFile = file(keystoreProperties["storeFile"] as String)
				storePassword = keystoreProperties["storePassword"] as String
				keyAlias = keystoreProperties["keyAlias"] as String
				keyPassword = keystoreProperties["keyPassword"] as String
			}
		}
	}

	buildTypes {
		release {
			isMinifyEnabled = false
			if (keystorePropertiesFile.exists()) {
				signingConfig = signingConfigs.getByName("release")
			}
			proguardFiles(
				getDefaultProguardFile("proguard-android-optimize.txt"),
				"proguard-rules.pro"
			)
		}
	}

	compileOptions {
		sourceCompatibility = JavaVersion.VERSION_17
		targetCompatibility = JavaVersion.VERSION_17
	}

	kotlinOptions {
		jvmTarget = "17"
	}

	buildFeatures {
		viewBinding = true
	}
}

android.applicationVariants.all {
	outputs.all {
		(this as BaseVariantOutputImpl).outputFileName =
			"energizer-${versionName}-${name}.apk"
	}
}

dependencies {
	implementation("androidx.core:core-ktx:1.13.1")
	implementation("androidx.appcompat:appcompat:1.7.0")
	implementation("androidx.activity:activity-ktx:1.9.0")
	implementation("androidx.webkit:webkit:1.11.0")
}
