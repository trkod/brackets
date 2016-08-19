/*
 * Copyright (c) 2014 - present Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*global describe, it, expect, runs, spyOn */

define(function (require, exports, module) {
    'use strict';

    var MainViewFactory = require("view/MainViewFactory");

    describe("ViewFactory", function () {
        function createMockFactory() {
            return {
                canOpenFile: function (fullPath) {
                    return (fullPath === "blah");
                }
            };
        }
        it("should register a factory", function () {
            runs(function () {
                var factory = createMockFactory();
                spyOn(factory, "canOpenFile");
                MainViewFactory.registerViewFactory(factory);
                MainViewFactory.findSuitableFactoryForPath();
                expect(factory.canOpenFile).toHaveBeenCalled();
            });
        });
        it("should find a factory", function () {
            runs(function () {
                var factory = createMockFactory();

                MainViewFactory.registerViewFactory(factory);
                var result = MainViewFactory.findSuitableFactoryForPath("blah");

                expect(result).toBeTruthy();
            });
        });
        it("should not find a factory", function () {
            runs(function () {
                var factory = createMockFactory();
                MainViewFactory.registerViewFactory(factory);
                var result = MainViewFactory.findSuitableFactoryForPath("blahblah");
                expect(result).toBeFalsy();
            });
        });
    });
});

