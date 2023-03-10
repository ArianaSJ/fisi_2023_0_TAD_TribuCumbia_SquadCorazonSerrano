package com.optic.deliverykotlinudemy.routes


import com.optic.deliverykotlinudemy.models.MercadoPagoPayment
import com.optic.deliverykotlinudemy.models.ResponseHttp
import retrofit2.Call
import retrofit2.http.*

interface PaymentsRoutes {

    @POST("payments/create")
    fun createPayment(
        @Body mercadoPagoPayment: MercadoPagoPayment,
        @Header("Authorization") token: String
    ): Call<ResponseHttp>



}