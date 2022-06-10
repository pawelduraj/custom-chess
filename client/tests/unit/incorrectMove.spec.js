import {mount} from "@vue/test-utils";
import ChessBoard from "@/components/ChessBoard";

let get_field = function (wrapper, n) {
    let fields = Array(n);
    for (let i = 0; i < n; i++)
        fields[i] = (wrapper.findComponent({ref: i.toString()})).html();
    return fields;
}

describe("Nieprawidlowe", () => {
    test("Nieprawidłowy ruch białym gońcem1 c3 -> c2", async () => {
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
        let change = [42, 50];
        await Promise.all(change.map(async(item) => {
            let act = wrapper.findComponent({ref: item.toString()});
            await act.trigger("click");
        }))
        for (let i = 0; i < 64; i++)
            if (!change.includes(i))
                expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
        expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
        expect(wrapper.findComponent({ref: "50"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
    }),
        test("Nieprawidłowy ruch białym gońcem2 e5 -> a5", async () => {
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
            let change = [28, 32];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
            for (let i = 0; i < 64; i++)
                if (!change.includes(i))
                    expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
            expect(wrapper.findComponent({ref: "28"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            expect(wrapper.findComponent({ref: "32"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        }),
        test("Nieprawidłowy ruch białym gońcem3 e5 -> e1", async () => {
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
            let change = [28, 60];
            await Promise.all(change.map(async(item) => {
                let act = wrapper.findComponent({ref: item.toString()});
                await act.trigger("click");
            }))
            for (let i = 0; i < 64; i++)
                if (!change.includes(i))
                    expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
            expect(wrapper.findComponent({ref: "28"}).html()).toBe("<div class=\"size green\"><img src=\"img/bishop_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
            expect(wrapper.findComponent({ref: "60"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
        }),
        test("Nieprawidłowy ruch biała wieża1 c3 -> c4", async () => {
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
                let change = [42, 35];
                await Promise.all(change.map(async(item) => {
                    let act = wrapper.findComponent({ref: item.toString()});
                    await act.trigger("click");
                }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "35"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Nieprawidłowy ruch biała wieża2 c3 -> a1", async () => {
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
                let change = [42, 56];
                await Promise.all(change.map(async(item) => {
                    let act = wrapper.findComponent({ref: item.toString()});
                    await act.trigger("click");
                }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "42"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "56"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Nieprawidłowy ruch biała wieża3 f6 -> e4", async () => {
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
                let change = [21, 36];
                await Promise.all(change.map(async(item) => {
                    let act = wrapper.findComponent({ref: item.toString()});
                    await act.trigger("click");
                }))
                for (let i = 0; i < 64; i++)
                    if (!change.includes(i))
                        expect(wrapper.findComponent({ref: i.toString()}).html()).toBe(fields[i])
                expect(wrapper.findComponent({ref: "21"}).html()).toBe("<div class=\"size green\"><img src=\"img/rook_w.png\" alt=\"\" class=\"hoverPiece\"></div>");
                expect(wrapper.findComponent({ref: "36"}).html()).toBe("<div class=\"size green\"><img src=\"\" alt=\"\" class=\"hoverPiece\"></div>");
            }
        ),
        test("Nieprawidłowy ruch białym koniem", async () => {
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