import './dynamo-db'
import { apiGateway } from './api-gateway'
import './cognito'
import './lambdas'

export const apiUrl = apiGateway.url