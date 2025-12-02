import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useInterpolations } from "./useInterpolations";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";

describe("useInterpolations", () => {
  beforeEach(() => {
    chrome.storage.local.clear();
    chrome.storage.sync.clear();
  });
  it("should return current interpolations", async () => {
    const interpolation = createHeaderInterpolation({
      headerKey: "X-Test",
      headerValue: "test.domain",
      name: "Test Interpolation",
    });
    await InterpolateStorage.create([interpolation]);
    const { result } = renderHook(() => useInterpolations());

    await waitFor(() => expect(chrome.storage.sync.get).toBeCalledTimes(3));
    await waitFor(() =>
      expect(result.current.interpolations[0]).toEqual(interpolation),
    );
  });
  it("should pause all interpolations", async () => {
    const interpolation1 = createHeaderInterpolation({
      headerKey: "X-Test-1",
      headerValue: "test1.domain",
      name: "Test Interpolation 1",
    });
    const interpolation2 = createHeaderInterpolation({
      headerKey: "X-Test-2",
      headerValue: "test2.domain",
      name: "Test Interpolation 2",
    });
    await InterpolateStorage.create([interpolation1, interpolation2]);
    const { result } = renderHook(() => useInterpolations());

    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    await result.current.pauseAll();
    await waitFor(() =>
      expect(
        result.current.interpolations.every(
          (interp) => interp.enabledByUser === false,
        ),
      ).toBe(true),
    );
  });
  it("should resume all interpolations", async () => {
    const interpolation1 = createHeaderInterpolation({
      headerKey: "X-Test-1",
      headerValue: "test1.domain",
      name: "Test Interpolation 1",
    });
    const interpolation2 = createHeaderInterpolation({
      headerKey: "X-Test-2",
      headerValue: "test2.domain",
      name: "Test Interpolation 2",
    });
    await InterpolateStorage.create([interpolation1, interpolation2]);
    const { result } = renderHook(() => useInterpolations());

    await result.current.pauseAll();
    await waitFor(() =>
      expect(
        result.current.interpolations.every(
          (interp) => interp.enabledByUser === false,
        ),
      ).toBe(true),
    );

    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    await result.current.resumeAll();
    await waitFor(() =>
      expect(
        result.current.interpolations.every(
          (interp) => interp.enabledByUser === true,
        ),
      ).toBe(true),
    );
  });
  it("should pause a single interpolation", async () => {
    const interpolations = [
      createHeaderInterpolation({
        headerKey: "X-Test",
        headerValue: "test.domain",
        name: "Test Interpolation",
      }),
      createHeaderInterpolation({
        headerKey: "X-Test-2",
        headerValue: "test2.domain",
        name: "Test Interpolation 2",
      }),
    ];

    await InterpolateStorage.create(interpolations);
    const { result } = renderHook(() => useInterpolations());

    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    await result.current.pause(interpolations[0].details.id);
    await waitFor(() =>
      expect(result.current.interpolations[0].enabledByUser).toBeFalsy(),
    );
  });
  it("should indicate when all interpolations are paused", async () => {
    const interpolations = [
      createHeaderInterpolation({
        headerKey: "X-Test",
        headerValue: "test.domain",
        name: "Test Interpolation",
      }),
      createHeaderInterpolation({
        headerKey: "X-Test-2",
        headerValue: "test2.domain",
        name: "Test Interpolation 2",
      }),
    ];

    await InterpolateStorage.create(interpolations);
    const { result } = renderHook(() => useInterpolations());
    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    expect(result.current.allPaused).toBe(false);

    await result.current.pauseAll();

    await waitFor(() => expect(result.current.allPaused).toBe(true));

    expect(
      result.current.interpolations.every(
        (interp) => interp.enabledByUser === false,
      ),
    ).toBe(true);
  });
  it("should remove an interpolation", async () => {
    const interpolations = [
      createHeaderInterpolation({
        headerKey: "X-Test",
        headerValue: "test.domain",
        name: "Test Interpolation",
      }),
      createHeaderInterpolation({
        headerKey: "X-Test-2",
        headerValue: "test2.domain",
        name: "Test Interpolation 2",
      }),
    ];

    await InterpolateStorage.create(interpolations);
    const { result } = renderHook(() => useInterpolations());
    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    await result.current.remove(interpolations[0].details.id);
    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(1);
    });
    expect(result.current.interpolations[0].details.id).toEqual(
      interpolations[1].details.id,
    );
  });
  it("should remove all interpolations", async () => {
    const interpolations = [
      createHeaderInterpolation({
        headerKey: "X-Test",
        headerValue: "test.domain",
        name: "Test Interpolation",
      }),
      createHeaderInterpolation({
        headerKey: "X-Test-2",
        headerValue: "test2.domain",
        name: "Test Interpolation 2",
      }),
    ];

    await InterpolateStorage.create(interpolations);
    const { result } = renderHook(() => useInterpolations());
    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(2);
    });

    await result.current.removeAll();
    await waitFor(() => {
      return expect(result.current.interpolations.length).toEqual(0);
    });
  });
});
