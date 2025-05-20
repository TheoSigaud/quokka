import {
    loginSchemaJson,
    authErrorResponseSchemaJson,
    authCheckResponseSchemaJson, authLogoutResponseSchemaJson
} from "../authSchema";

export const authLoginSwaggerSchema = {
    body: loginSchemaJson,
    response: {
        200: {},
        401: authErrorResponseSchemaJson,
    },
    description: 'Login',
    tags: ['auth'],
    summary: 'Login user',
}

export const authCheckSwaggerSchema = {
    response: {
        200: authCheckResponseSchemaJson,
        401: authErrorResponseSchemaJson,
    },
    description: 'Check',
    tags: ['auth'],
    summary: 'Check if user is logged in',
}

export const authLogoutSwaggerSchema = {
    response: {
        200: authLogoutResponseSchemaJson,
        401: authErrorResponseSchemaJson,
    },
    description: 'Logout',
    tags: ['auth'],
    summary: 'Logout user',
}