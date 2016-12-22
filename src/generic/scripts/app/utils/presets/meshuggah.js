const preset = {
    id: 'meshuggah',
    description: 'Meshuggah',
    settings: {
        config: {
            bpm : 90,
        },
        sequences: [
            {
                id    : 'total',
                bars  : 4,
                beats : 4,
            },
            {
                id             : 'CUSTOM_SEQUENCE_1',
                bars           : 1,
                beats          : 7,
                hitChance      : 1,
                allowedLengths : [
                        {
                            id: '1',
                            amount: 1,
                            isDotted: true,
                        },
                        {
                            id: '2',
                            amount: 3,
                            isDotted: true,
                        },
                        {
                            id: '4',
                            amount: 1,
                        },
                ],
            },
        ],
        instruments: [
            {
                id: 'g',
                pitch: -300,
                sounds : [
                    {
                        id: 'sixth-0-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-12-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-13-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-15-open',
                        enabled: true,
                    },
                    {
                        id: 'sixth-0-muted',
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
                        id: 'crash-left',
                        enabled: true,
                    },
                    {
                        id: 'crash-right',
                        enabled: true,
                    },
                    {
                        id: 'china-left',
                        enabled: true,
                    }
                ],
            },
        ]
    }
};

export default preset;
