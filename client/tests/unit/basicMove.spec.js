import ChessBoard from "@/components/ChessBoard";
import {mount} from "@vue/test-utils";


let get_field = function (wrapper, n) {
    let fields = Array(n);
    for (let i = 0; i < n; i++)
        fields[i] = (wrapper.findComponent({ref: i.toString()})).html();
    return fields;
}

describe('Pozycja startowa', () => {
    test('Ruch Białym koniem b2 -> a3', async () => {
        const wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: {
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
                    },
                    online: false,
                    reset: false,
                    message: 0
                }
            }
        );
        const fields = get_field(wrapper, 64);
        let change = [57, 40];
        let act = wrapper.findComponent({ref: "57"});
        let act2 = wrapper.findComponent({ref: "40"});
        await act.trigger("click");
        await act2.trigger("click");
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "57"}).html()).toBe("<div class=\"size white\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "40"}).html()).toBe("<div class=\"size grey\"><img src=\"img/knight_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
    })
})

describe("Podstawowe mozliwosci ruchu", () => {
    test("Ruch białym gońcem1 c3 -> d4", async () => {
        const wrapper = mount(ChessBoard,
            {
                propsData: {
                    variant: {
                        name: 'Standard', players: 2,
                        board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                        pieces: [
                            {id: 'B', checkable: false, color: 0, field: 18}
                        ],
                        rules: [
                            {id: 'capture-all', value: false},
                            {id: 'castling', value: true},
                            {id: 'multimove', value: [1]}
                        ]
                    },
                    online: false,
                    reset: false,
                    message: 0
                }
            });
        const fields = get_field(wrapper, 64);
        let change = [42, 35];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "35"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
    }),
        test("Ruch białym gońcem2 e5 -> a1", async () => {
            const wrapper = mount(ChessBoard,
                {
                    propsData: {
                        variant: {
                            name: 'Standard', players: 2,
                            board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                            pieces: [
                                {id: 'B', checkable: false, color: 0, field: 36}
                            ],
                            rules: [
                                {id: 'capture-all', value: false},
                                {id: 'castling', value: true},
                                {id: 'multimove', value: [1]}
                            ]
                        },
                        online: false,
                        reset: false,
                        message: 0
                    }
                });
            const fields = get_field(wrapper, 64);
            let change = [28, 56];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
            for (let i = 0; i < 64; i++)
                if (!change.includes(i))
                    expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
            expect(wrapper.findComponent({ref: "28"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
            expect(wrapper.findComponent({ref: "56"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        }),
        test("Ruch białym gońcem3 e5 -> b2", async () => {
            const wrapper = mount(ChessBoard,
                {
                    propsData: {
                        variant: {
                            name: 'Standard', players: 2,
                            board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                            pieces: [
                                {id: 'B', checkable: false, color: 0, field: 36}
                            ],
                            rules: [
                                {id: 'capture-all', value: false},
                                {id: 'castling', value: true},
                                {id: 'multimove', value: [1]}
                            ]
                        },
                        online: false,
                        reset: false,
                        message: 0
                    }
                });
            const fields = get_field(wrapper, 64);
            let change = [28, 1];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
            for (let i = 0; i < 64; i++)
                if (!change.includes(i))
                    expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
            expect(wrapper.findComponent({ref: "28"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
            expect(wrapper.findComponent({ref: "1"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        }),
        test("Ruch biała wieża1 c3 -> f3", async () => {
                const wrapper = mount(ChessBoard,
                    {
                        propsData: {
                            variant: {
                                name: 'Standard', players: 2,
                                board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                                pieces: [
                                    {id: 'R', checkable: false, color: 0, field: 18}
                                ],
                                rules: [
                                    {id: 'capture-all', value: false},
                                    {id: 'castling', value: true},
                                    {id: 'multimove', value: [1]}
                                ]
                            },
                            online: false,
                            reset: false,
                            message: 0
                        }
                    });
                const fields = get_field(wrapper, 64);
                let change = [42, 45];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "45"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Ruch biała wieża2 c3 -> c8", async () => {
                const wrapper = mount(ChessBoard,
                    {
                        propsData: {
                            variant: {
                                name: 'Standard', players: 2,
                                board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                                pieces: [
                                    {id: 'R', checkable: false, color: 0, field: 18}
                                ],
                                rules: [
                                    {id: 'capture-all', value: false},
                                    {id: 'castling', value: true},
                                    {id: 'multimove', value: [1]}
                                ]
                            },
                            online: false,
                            reset: false,
                            message: 0
                        }
                    });
                const fields = get_field(wrapper, 64);
                let change = [42, 2];
                await Promise.all(change.map(async(item) => {
                    let act = wrapper.findComponent({ref: item.toString()});
                    await act.trigger("click");
                }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "2"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Ruch biała wieża3 f6 -> a6", async () => {
                const wrapper = mount(ChessBoard,
                    {
                        propsData: {
                            variant: {
                                name: 'Standard', players: 2,
                                board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                                pieces: [
                                    {id: 'R', checkable: false, color: 0, field: 45}
                                ],
                                rules: [
                                    {id: 'capture-all', value: false},
                                    {id: 'castling', value: true},
                                    {id: 'multimove', value: [1]}
                                ]
                            },
                            online: false,
                            reset: false,
                            message: 0
                        }
                    });
                const fields = get_field(wrapper, 64);
                let change = [21, 16];
                await Promise.all(change.map(async(item) => {
                    let act = wrapper.findComponent({ref: item.toString()});
                    await act.trigger("click");
                }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "21"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "16"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Ruch białym koniem", async () => {
                const wrapper = mount(ChessBoard,
                    {
                        propsData: {
                            variant: {
                                name: 'Standard', players: 2,
                                board: {name: '8x8', id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
                                pieces: [
                                    {id: 'N', checkable: false, color: 0, field: 18}
                                ],
                                rules: [
                                    {id: 'capture-all', value: false},
                                    {id: 'castling', value: true},
                                    {id: 'multimove', value: [1]}
                                ]
                            },
                            online: false,
                            reset: false,
                            message: 0
                        }
                    });
                const fields = get_field(wrapper, 64);
                let change = [42, 27];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "27"}).html()).toBe("<div class=\"size green\"><img src=\"img/knight_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        )
})