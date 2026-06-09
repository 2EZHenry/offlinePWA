package com.energizer.batteryguide

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader
import com.energizer.batteryguide.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
	private lateinit var binding: ActivityMainBinding

	private val assetLoader by lazy {
		WebViewAssetLoader.Builder()
			.addPathHandler(
				"/assets/",
				WebViewAssetLoader.AssetsPathHandler(this)
			)
			.build()
	}

	@SuppressLint("SetJavaScriptEnabled")
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)

		binding = ActivityMainBinding.inflate(layoutInflater)
		setContentView(binding.root)

		WindowCompat.setDecorFitsSystemWindows(window, false)
		hideSystemUi()

		configureWebView(binding.webView)
		handleBackPress(binding.webView)

		if (savedInstanceState == null) {
			binding.webView.loadUrl(APP_URL)
		} else {
			binding.webView.restoreState(savedInstanceState)
		}
	}

	override fun onSaveInstanceState(outState: Bundle) {
		super.onSaveInstanceState(outState)
		binding.webView.saveState(outState)
	}

	override fun onWindowFocusChanged(hasFocus: Boolean) {
		super.onWindowFocusChanged(hasFocus)
		if (hasFocus) {
			hideSystemUi()
		}
	}

	private fun configureWebView(webView: WebView) {
		webView.settings.apply {
			javaScriptEnabled = true
			domStorageEnabled = true
			loadWithOverviewMode = true
			useWideViewPort = true
			displayZoomControls = false
			builtInZoomControls = false
			cacheMode = WebSettings.LOAD_DEFAULT
			allowFileAccess = false
			allowContentAccess = false
		}

		webView.isLongClickable = false
		webView.isHapticFeedbackEnabled = false
		webView.overScrollMode = View.OVER_SCROLL_NEVER

		webView.webViewClient = object : WebViewClient() {
			override fun shouldInterceptRequest(
				view: WebView,
				request: WebResourceRequest
			): WebResourceResponse? {
				return assetLoader.shouldInterceptRequest(request.url)
			}
		}
	}

	private fun handleBackPress(webView: WebView) {
		onBackPressedDispatcher.addCallback(
			this,
			object : OnBackPressedCallback(true) {
				override fun handleOnBackPressed() {
					if (webView.canGoBack()) {
						webView.goBack()
					}
				}
			}
		)
	}

	private fun hideSystemUi() {
		val controller = WindowInsetsControllerCompat(window, window.decorView)
		controller.systemBarsBehavior =
			WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
		controller.hide(WindowInsetsCompat.Type.systemBars())
	}

	companion object {
		private const val APP_URL =
			"https://appassets.androidplatform.net/assets/www/index.html"
	}
}
