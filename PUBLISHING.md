# How to Publish Logic

## 1. Login to correct account
```bash
npm login
```

## 2. Check version bump
Update `package.json` version:
```bash
npm version patch # or minor/major
```

## 3. Build the package
Ensure dist folder is fresh:
```bash
npm run build
```

## 4. Dry run (verify files)
```bash
npm publish --dry-run
```

## 5. Publish
```bash
npm publish --access public
```

---

## Post-Publish Checklist
1. Update changelog.
2. Create GitHub Release tag.
3. Verify on npmjs.com.
