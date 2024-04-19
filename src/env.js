// Taken from https://github.com/motdotla/dotenv/issues/133#issuecomment-255298822
// Allows dotenv to be imported properlt in the edge function
import dotenv from 'dotenv'
dotenv.config({ silent: true })