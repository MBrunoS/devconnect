![DevConnect](src/assets//dev-connect-logo.png "DevConnect Logo")

> This project is intended to be a template for social media apps using Next.js. Use it to learn or to fit your own needs.

**Technologies used:**

- Typescript
- React
- Next.js
- NextAuth
- SWR & Axios
- Prisma

---

## Example

## Usage

After cloning the repository, install the dependencies:

```
yarn
```

Then, choose your database provider and update `prisma/schema.prisma` accordingly. Or if you want to use SQLite, don't change anything there.

Rename the `.env` file to `.env.local` and update the keys:

- `GITHUB_ID` and `GITHUB_SECRET`: your Github OAuth app credentials.
- `NEXTAUTH_SECRET`: a random string, you can run `openssl rand -base64 32`

Now, run the migrations on the DB:

```
yarn prisma migrate dev
```

and run the development server:

```
yarn dev
```

Happy hacking and connecting!

## Next steps

- Paginate posts and comments
- When submitting a comment, refetch only that post comments
