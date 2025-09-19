# Semantic Versioning (SemVer)
###### *Karl Marx Roxas September 17, 2025*

---

**X.Y.Z** is a placeholder for a version number, where each letter represents a different type of change:

- **X (Major)**: Incremented for major, breaking changes. These changes are not backward-compatible and often require a user to refactor their code. For example, a version change from `1.0.0` to `2.0.0` indicates a new major version.

- **Y (Minor)**: Incremented for new features that are backward-compatible. This means you can update to a new minor version without breaking existing functionality. When Y is incremented, Z is reset to 0. For example, a version change from `1.2.0`to `1.3.0` indicates a new minor version.

- **Z (Patch)**: Incremented for backward-compatible bug fixes and hotfixes. When Z is incremented, the X and Y values remain the same. For example, a version change from `1.2.3` to `1.2.4` indicates a new patch version.

**Tilde (~)** and **Caret (^)** Shorthand

- Tilde (~): Prefixing a version with a ~ allows for patch-level updates. It locks the major and minor versions but allows the patch version to be the latest available.

`~1.2.3` resolves to a version range of `>=1.2.3` `<1.3.0`.

- Caret (^): Prefixing a version with a ^ allows for minor and patch-level updates. It locks the major version but allows the minor and patch versions to be the latest available.

`^1.2.3` resolves to a version range of `>=1.2.3` `<2.0.0`.

**The "Zero-Major" Edge Case**

If the major version is 0 (e.g., 0.x.x), the caret (^) behaves like a tilde (~). This is because a major version of 0 indicates the software is still in its initial development phase, and the public API should not be considered stable.

`^0.2.3` resolves to a version range of `>=0.2.3` `<0.3.0`. This prevents you from accidentally getting a new minor version that could introduce breaking changes when the package is not yet stable.