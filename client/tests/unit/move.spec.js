import ChessBoard from "@/components/ChessBoard";
import {mount} from "@vue/test-utils";


describe('Chess Board test', () =>
{
    test('first test', () =>
    {
        const wrapper = mount(ChessBoard);
        const row = wrapper.findComponent({ref: "40"});
        expect(row.html()).toBe("<div class=\"size grey\"><img src=\"\" alt=\"\"></div>");
        row.trigger("click").then(() => {
            expect(row.html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\"></div>");
        });

    })
})