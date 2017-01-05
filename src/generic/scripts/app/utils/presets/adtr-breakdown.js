const preset = {
    id: 'adtr',
    description: 'ADTR Breakdown',
    settings: {
        config: {
            bpm            : 90,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id        : 'CUSTOM_SEQUENCE_1',
                bars      : 2,
                beats     : 4,
                hitChance : .8,
                allowedLengths : [
                    {
                        id: "1",
                        amount:1,
                    },
                    {
                        id: "2",
                        amount: 1,
                    },
                    {
                        id: "4",
                        amount: 2,
                    },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                repeatHitTypeForXBeat: 2,
                sounds: [
                    {
                        id: 'sixth-3-muted',
                        enabled: true,
                    },
                    {
                        id: 'sixth-4-muted',
                        enabled: true,
                    },
                ],
            },
            {
                id: 'k',
                sounds: [
                    {
                        id: 'k',
                        enabled: true,
                    }
                ],
            },
            {
                id: 's',
                sounds: [
                    {
                        id: 's',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'c',
                ringout: true,
                sounds: [
                    {
                        id: 'china-left',
                        enabled: true,
                    }
                ],
            },
            {
                id: 'd',
                sounds: [
                    {
                        id: 'drone-high',
                        enabled: false,
                    },
                ],
            },
        ]
    }
}

export default preset;
