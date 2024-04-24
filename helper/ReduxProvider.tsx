"use client"

import { createStore } from "@reduxjs/toolkit"
    import { rootStore } from "@/services/lib/store"
   import React, { ReactNode } from "react"
   import { Provider } from "react-redux"

   type ReduxProviderType = {
     children: ReactNode
   }

   function ReduxProvider({ children }: ReduxProviderType) {
     return <Provider store={rootStore}>{children}</Provider>
   }

   export default ReduxProvider