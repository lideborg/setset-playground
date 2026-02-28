#!/usr/bin/env python3
"""
Rename After Effects sequential outputs to match original filenames.

After Effects can't preserve original filenames, so it exports as:
  35_00.png, 35_01.png, 35_02.png, ...
  back_00.png, back_01.png, ...
  flatlay_00.png, flatlay_01.png, ...

This script maps those back to the original filenames by matching
the sorted sequence order from the input folder.

Usage:
  python3 rename-ae-to-originals.py <transparent_dir> <finals_dir> [--dry-run]

Example:
  python3 rename-ae-to-originals.py \
    "/path/to/12_Lowres/Transparent" \
    "/path/to/14_Finals_PNG" \
    --dry-run

The transparent_dir should have subfolders like:
  34/, back/, belt/, collar/, eyelet/, flatlay/, sleeves/

The finals_dir should have files like:
  35_00.png, 35_01.png, back_00.png, back_01.png, etc.

Note: AE folder "35" maps to transparent folder "34" (AE adds 1 to folder names)
"""

import os
import sys
import argparse


# Mapping of AE prefix to Transparent folder name
# Adjust this if your AE comp names differ
DEFAULT_FOLDER_MAPPING = {
    "35": "34",      # AE adds 1 to numeric folder names
    "back": "back",
    "belt": "belt",
    "collar": "collar",
    "eyelet": "eyelet",
    "flatlay": "flatlay",
    "sleeves": "sleeves",
}


def rename_ae_to_originals(transparent_dir, finals_dir, folder_mapping=None, dry_run=False):
    """
    Rename AE sequential outputs to match original filenames.

    Args:
        transparent_dir: Path to folder with original files (organized in subfolders)
        finals_dir: Path to AE output folder (flat, with prefix_XX.png naming)
        folder_mapping: Dict mapping AE prefix to transparent subfolder name
        dry_run: If True, only print what would be renamed

    Returns:
        List of (old_name, new_name) tuples
    """
    if folder_mapping is None:
        folder_mapping = DEFAULT_FOLDER_MAPPING

    renames = []

    for ae_prefix, trans_folder in folder_mapping.items():
        trans_path = os.path.join(transparent_dir, trans_folder)

        if not os.path.exists(trans_path):
            print(f"Warning: Transparent folder not found: {trans_path}")
            continue

        # Get sorted list of original files
        orig_files = sorted([f for f in os.listdir(trans_path) if f.endswith('.png')])

        # Get sorted list of AE outputs for this prefix
        ae_files = sorted([f for f in os.listdir(finals_dir)
                          if f.startswith(f"{ae_prefix}_") and f.endswith('.png')])

        if len(ae_files) != len(orig_files):
            print(f"Warning: Count mismatch for {ae_prefix}!")
            print(f"  AE files: {len(ae_files)}, Original files: {len(orig_files)}")
            continue

        print(f"\n{ae_prefix} → {trans_folder}: {len(ae_files)} files")

        for ae_file, orig_file in zip(ae_files, orig_files):
            src = os.path.join(finals_dir, ae_file)
            dst = os.path.join(finals_dir, orig_file)

            if dry_run:
                print(f"  [DRY RUN] {ae_file} → {orig_file}")
            else:
                if os.path.exists(dst):
                    print(f"  [SKIP] {orig_file} already exists")
                    continue
                os.rename(src, dst)
                print(f"  ✓ {ae_file} → {orig_file}")

            renames.append((ae_file, orig_file))

    return renames


def main():
    parser = argparse.ArgumentParser(
        description='Rename AE sequential outputs to match original filenames',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('transparent_dir', help='Path to folder with original files (with subfolders)')
    parser.add_argument('finals_dir', help='Path to AE output folder (flat)')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without renaming')
    parser.add_argument('--mapping', type=str, help='Custom folder mapping as JSON (e.g., \'{"35":"34"}\')')

    args = parser.parse_args()

    # Validate paths
    if not os.path.exists(args.transparent_dir):
        print(f"Error: Transparent directory not found: {args.transparent_dir}")
        sys.exit(1)

    if not os.path.exists(args.finals_dir):
        print(f"Error: Finals directory not found: {args.finals_dir}")
        sys.exit(1)

    # Parse custom mapping if provided
    folder_mapping = DEFAULT_FOLDER_MAPPING
    if args.mapping:
        import json
        try:
            folder_mapping = json.loads(args.mapping)
        except json.JSONDecodeError as e:
            print(f"Error parsing mapping JSON: {e}")
            sys.exit(1)

    print("=" * 50)
    print("RENAME AE OUTPUTS TO ORIGINAL FILENAMES")
    print("=" * 50)
    print(f"Transparent dir: {args.transparent_dir}")
    print(f"Finals dir: {args.finals_dir}")
    print(f"Dry run: {args.dry_run}")
    print(f"Folder mapping: {folder_mapping}")

    renames = rename_ae_to_originals(
        args.transparent_dir,
        args.finals_dir,
        folder_mapping,
        args.dry_run
    )

    print("\n" + "=" * 50)
    print(f"Total: {len(renames)} files {'would be' if args.dry_run else ''} renamed")
    print("=" * 50)


if __name__ == '__main__':
    main()
