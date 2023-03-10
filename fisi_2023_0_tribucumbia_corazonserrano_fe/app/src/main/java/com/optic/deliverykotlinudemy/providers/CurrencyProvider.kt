package com.optic.deliverykotlinudemy.providers

import com.google.gson.JsonObject
import com.optic.deliverykotlinudemy.api.CurrencyApiRoutes
import com.optic.deliverykotlinudemy.routes.CurrencyRoutes
import retrofit2.Call

class CurrencyProvider() {

    private var currencyRoutes: CurrencyRoutes? = null

    init {
        val api = CurrencyApiRoutes()
        currencyRoutes = api.getCurrencyRoutes()
    }

    fun getCurrencyValue(): Call<JsonObject>? {
        return currencyRoutes?.getCurrencyValue()
    }


}