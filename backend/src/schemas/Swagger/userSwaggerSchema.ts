import {
    userErrorResponseSchemaJson,
    userResponseSchemaJson,
    userFormSchemaJson, usersFormSchemaJson,
} from "../userSchema";

export const userCreateSwaggerSchema = {
    body: userFormSchemaJson,
    response: {
        201: userResponseSchemaJson,
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
        500: userErrorResponseSchemaJson,
    },
    description: 'Create a new user',
    tags: ['user'],
    summary: 'Create User',
}

export const userGetSwaggerSchema = {
    response: {
        200: userResponseSchemaJson,
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
        404: userErrorResponseSchemaJson,
        500: userErrorResponseSchemaJson,
    },
    description: 'Get user by id',
    tags: ['user'],
    summary: 'Get user',
}

export const userCountSwaggerSchema = {
    query: usersFormSchemaJson,
    response: {
        200: {
            type: 'object',
            properties: {
                count: { type: 'number' },
            },
        },
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
    },
    description: 'Get user count',
    tags: ['user'],
    summary: 'Get user count',
}

export const usersGetSwaggerSchema = {
    query: usersFormSchemaJson,
    response: {
        200: {
            type: 'array',
            items: userResponseSchemaJson,
        },
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
    },
    description: 'Get all users',
    tags: ['user'],
    summary: 'Get users',
}

export const userUpdateSwaggerSchema = {
    body: userFormSchemaJson,
    response: {
        200: userResponseSchemaJson,
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
        404: userErrorResponseSchemaJson,
        500: userErrorResponseSchemaJson,
    },
    description: 'Update a user',
    tags: ['user'],
    summary: 'Update User',
}

export const userDeleteSwaggerSchema = {
    response: {
        200: {},
        400: userErrorResponseSchemaJson,
        401: userErrorResponseSchemaJson,
        403: userErrorResponseSchemaJson,
        404: userErrorResponseSchemaJson,
        500: userErrorResponseSchemaJson,
    },
    description: 'Update a user',
    tags: ['user'],
    summary: 'Update User',
}
