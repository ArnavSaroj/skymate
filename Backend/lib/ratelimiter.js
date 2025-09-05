import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 10, // Limit each IP to 10 requests per `window` (here, per 10 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56,// Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	message:"signup limit reached,try again lager"
    // store: ... , // Redis, Memcached, etc. See below.
})

export default limiter;