import {mount} from "@vue/test-utils";
import ChessBoard from "@/components/ChessBoard";

let get_field = function (wrapper, n) {
    let fields = Array(n);
    for (let i = 0; i < n; i++)
        fields[i] = (wrapper.findComponent({ref: i.toString()})).html();
    return fields;
}
let sVar = {
    name: 'Standard', players: 2,
    board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
    pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {
            id: 'R',
            checkable: false,
            color: 0,
            field: 7
        },
        {id: 'N', checkable: false, color: 0, field: 1}, {
            id: 'N',
            checkable: false,
            color: 0,
            field: 6
        },
        {id: 'B', checkable: false, color: 0, field: 2}, {
            id: 'B',
            checkable: false,
            color: 0,
            field: 5
        },
        {id: 'Q', checkable: false, color: 0, field: 3}, {
            id: 'K',
            checkable: true,
            color: 0,
            field: 4
        },
        {id: 'P', checkable: false, color: 0, field: 8}, {
            id: 'P',
            checkable: false,
            color: 0,
            field: 9
        },
        {id: 'P', checkable: false, color: 0, field: 10}, {
            id: 'P',
            checkable: false,
            color: 0,
            field: 11
        },
        {id: 'P', checkable: false, color: 0, field: 12}, {
            id: 'P',
            checkable: false,
            color: 0,
            field: 13
        },
        {id: 'P', checkable: false, color: 0, field: 14}, {
            id: 'P',
            checkable: false,
            color: 0,
            field: 15
        },
        {id: 'R', checkable: false, color: 1, field: 56}, {
            id: 'R',
            checkable: false,
            color: 1,
            field: 63
        },
        {id: 'N', checkable: false, color: 1, field: 57}, {
            id: 'N',
            checkable: false,
            color: 1,
            field: 62
        },
        {id: 'B', checkable: false, color: 1, field: 58}, {
            id: 'B',
            checkable: false,
            color: 1,
            field: 61
        },
        {id: 'K', checkable: true, color: 1, field: 60}, {
            id: 'Q',
            checkable: false,
            color: 1,
            field: 59
        },
        {id: 'P', checkable: false, color: 1, field: 48}, {
            id: 'P',
            checkable: false,
            color: 1,
            field: 49
        },
        {id: 'P', checkable: false, color: 1, field: 50}, {
            id: 'P',
            checkable: false,
            color: 1,
            field: 51
        },
        {id: 'P', checkable: false, color: 1, field: 52}, {
            id: 'P',
            checkable: false,
            color: 1,
            field: 53
        },
        {id: 'P', checkable: false, color: 1, field: 54}, {
            id: 'P',
            checkable: false,
            color: 1,
            field: 55
        }
    ],
    rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
    ]
};
describe('Ruchy specjalne', () => {
    test('Roszada', async () => {
        const wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: sVar,
                    online: false,
                    reset: false,
                    message: 0
                }
            }
        );
        const fields = get_field(wrapper, 64);
        let change = [52, 36, 11, 27, 62, 45, 1, 18, 61, 34, 2, 29, 60, 62, 3, 19, 57, 42, 4, 2];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        change.push(0)
        change.push(63)
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "0"}).html()).toBe("<div class=\"size white\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "1"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "2"}).html()).toBe("<div class=\"size white\"><img src=\"img/king_b.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "3"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_b.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "4"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "1"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "18"}).html()).toBe("<div class=\"size green\"><img src=\"img/knight_b.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "19"}).html()).toBe("<div class=\"size green\"><img src=\"img/queen_b.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "63"}).html()).toBe("<div class=\"size white\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "60"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "61"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "62"}).html()).toBe("<div class=\"size grey\"><img src=\"img/king_w.png\" alt=\"\" class=\"hoverPiece\"></div>");

    })
    test('Bicie w locie', async () => {
        let wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: sVar,
                    online: false,
                    reset: false,
                    message: 0
                }
            }
        );
        const fields = get_field(wrapper, 64);
        let change = [51, 35, 12, 28, 35, 28, 11, 27, 28, 19];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "51"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "11"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "12"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "19"}).html()).toBe("<div class=\"size green\"><img src=\"img/pawn_w.png\" alt=\"\" class=\"hoverPiece\"></div>");

    })
    test('Nieprawidlowe bicie w locie', async () => {
        let wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: sVar,
                    online: false,
                    reset: false,
                    message: 0
                }
            }
        );
        const fields = get_field(wrapper, 64);
        let change = [52, 36, 11, 27, 36, 27, 12, 28, 57, 42, 27, 20];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "52"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "11"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "12"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "20"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "27"}).html()).toBe("<div class=\"size green\"><img src=\"img/pawn_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "28"}).html()).toBe("<div class=\"size green\"><img src=\"img/pawn_b.png\" alt=\"\" class=\"hoverPiece\"></div>");

    })
    test('Nieprawidlowe roszada', async () => {
        let wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: sVar,
                    online: false,
                    reset: false,
                    message: 0
                }
            }
        );
        const fields = get_field(wrapper, 64);
        let change = [52, 36, 11, 27, 61, 43, 3, 19, 62, 45, 19, 20, 45, 30, 20, 36, 60, 62];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "62"}).html()).toBe("<div class=\"size grey\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "61"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "63"}).html()).toBe("<div class=\"size white\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "60"}).html()).toBe("<div class=\"size green\"><img src=\"img/king_w.png\" alt=\"\" class=\"hoverPiece\"></div>");

    })

})