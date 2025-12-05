import { beforeEach, describe, expect, it, vi } from "vitest";
import { InterpolateStorage } from "./InterpolateStorage";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";

describe("InterpolateStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    chrome.storage?.sync?.clear();
  });
  it("should create a new interpolation", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Test Header Interpolation",
      headerKey: "X-Test-Header",
      headerValue: "TestValue",
    });
    // Test implementation goes here
    await InterpolateStorage.create(interpolation);
    expect(chrome.storage?.sync?.set).toHaveBeenCalledExactlyOnceWith({
      [InterpolateStorage.getInterpolationRecordKey(interpolation.details.id)]:
        interpolation,
    });
  });
  it("should retrieve all interpolations", async () => {
    const interpolation1 = createHeaderInterpolation({
      name: "Header Interpolation 1",
      headerKey: "X-Header-1",
      headerValue: "Value1",
    });
    const interpolation2 = createHeaderInterpolation({
      name: "Header Interpolation 2",
      headerKey: "X-Header-2",
      headerValue: "Value2",
    });
    await InterpolateStorage.create([interpolation1, interpolation2]);
    expect(chrome.storage?.sync?.set).toHaveBeenCalledExactlyOnceWith({
      [InterpolateStorage.getInterpolationRecordKey(interpolation1.details.id)]:
        interpolation1,
      [InterpolateStorage.getInterpolationRecordKey(interpolation2.details.id)]:
        interpolation2,
    });

    const allInterpolations = await InterpolateStorage.getAllInterpolations();
    expect(allInterpolations).toEqual(
      expect.arrayContaining([interpolation1, interpolation2]),
    );
  });
  it("should disable an interpolation", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Header to Disable",
      headerKey: "X-Disable-Header",
      headerValue: "DisableValue",
    });
    await InterpolateStorage.create(interpolation);
    await InterpolateStorage.setIsEnabled(interpolation.details.id, false);
    const allInterpolations = await InterpolateStorage.getAllInterpolations();
    const disabledInterpolation = allInterpolations?.find(
      (interp) => interp.details.id === interpolation.details.id,
    );
    expect(disabledInterpolation?.enabledByUser).toBe(false);
  });
  it("should enable an interpolation", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Header to Enable",
      headerKey: "X-Enable-Header",
      headerValue: "EnableValue",
    });
    await InterpolateStorage.create(interpolation);
    await InterpolateStorage.setIsEnabled(interpolation.details.id, false);
    const allInterpolationsBefore =
      await InterpolateStorage.getAllInterpolations();
    const disabledInterpolation = allInterpolationsBefore?.find(
      (interp) => interp.details.id === interpolation.details.id,
    );
    expect(disabledInterpolation?.enabledByUser).toBe(false);

    await InterpolateStorage.setIsEnabled(interpolation.details.id, true);
    const allInterpolations = await InterpolateStorage.getAllInterpolations();
    const enabledInterpolation = allInterpolations?.find(
      (interp) => interp.details.id === interpolation.details.id,
    );
    expect(enabledInterpolation?.enabledByUser).toBe(true);
  });
  it("should invoke subscriber callback on interpolation creations", async () => {
    const callback = vi.fn();
    InterpolateStorage.subscribeToInterpolationChanges(callback);
    const interpolation = createHeaderInterpolation({
      name: "Header for Subscription",
      headerKey: "X-Subscribe-Header",
      headerValue: "SubscribeValue",
    });
    await InterpolateStorage.create(interpolation);
    expect(callback).toHaveBeenCalledExactlyOnceWith({
      created: [interpolation],
      removed: [],
      updated: [],
    });
  });
  it("should invoke subscriber callback when interpolation disabled by user", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Header to Update",
      headerKey: "X-Update-Header",
      headerValue: "UpdateValue",
    });
    await InterpolateStorage.create(interpolation);

    const callback = vi.fn();
    InterpolateStorage.subscribeToInterpolationChanges(callback);

    await InterpolateStorage.setIsEnabled(interpolation.details.id, false);

    expect(callback).toHaveBeenNthCalledWith(2, {
      created: [],
      removed: [],
      updated: [{ ...interpolation, enabledByUser: false }],
    });
  });
  it("should invoke subscriber callback when interpolation enabled by user", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Header to Update Enable",
      headerKey: "X-Update-Enable-Header",
      headerValue: "UpdateEnableValue",
    });
    await InterpolateStorage.create(interpolation);
    await InterpolateStorage.setIsEnabled(interpolation.details.id, false);

    const callback = vi.fn();
    InterpolateStorage.subscribeToInterpolationChanges(callback);

    await InterpolateStorage.setIsEnabled(interpolation.details.id, true);

    expect(callback).toHaveBeenNthCalledWith(2, {
      created: [],
      removed: [],
      updated: [{ ...interpolation, enabledByUser: true }],
    });
  });
  it("should invoke subscriber callback on interpolation deletions", async () => {
    const interpolation = createHeaderInterpolation({
      name: "Header to Delete",
      headerKey: "X-Delete-Header",
      headerValue: "DeleteValue",
    });
    await InterpolateStorage.create(interpolation);

    const callback = vi.fn();
    InterpolateStorage.subscribeToInterpolationChanges(callback);

    await InterpolateStorage.delete(interpolation.details.id);

    expect(callback).toHaveBeenCalledExactlyOnceWith({
      created: [],
      removed: [interpolation],
      updated: [],
    });
  });
});
