# RepoProvas


Full-Stack project of RepoProvas, a tests sharing platform.

## 📋 About

RepoProvas is a web browser application that provides a platform for students to share their tests with another students. Tests are organized by period or by the teacher who taught the class, allowing for easy navigation and study.

## 💻 Technologies and Concepts

### Front-end
- TypeScript
- React.js
- Material-UI
- OAuth Authentication
- Vercel

### Back-end
- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL
- Prisma ORM
- ThunderClient
- Integration Testing
- Jest
- Vercel

## 🏁 Building and running it locally

1. Clone this repository.
2. Access back-end directory
3. Install all dependencies.

```bash
npm install
```

3. Populate `.env` file based on `.env.example`.
4. Run the application.

```bash
npm start
```

5. Repeat the same process in front-end directory.

## 🧪 Testing

1. Access back-end directory.
2. For manual tests, use `repoprovasCollection` to test the application endpoints with ThunderClient. For automated tests (integration), type this command to run the tests:
```bash
npm run test
```