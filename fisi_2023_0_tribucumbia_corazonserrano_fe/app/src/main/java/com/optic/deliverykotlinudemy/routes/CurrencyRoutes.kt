package com.optic.deliverykotlinudemy.routes


import com.google.gson.JsonObject
import retrofit2.Call
import retrofit2.http.*

interface CurrencyRoutes {

    @GET("convert?q=USD_COP&compact=ultra&apiKey=49307d27b3df453fc8f0")
    fun getCurrencyValue(): Call<JsonObject>


}