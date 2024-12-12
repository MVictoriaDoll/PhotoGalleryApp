    import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log('ID:', id);

  // Lógica para obtener los datos del álbum según el 'id'
  const album = {
    id,
    title: `Álbum ${id}`,
    description: `Descripción del álbum ${id}`,
    // Otros campos según sea necesario
  };

  return NextResponse.json(album);
};
